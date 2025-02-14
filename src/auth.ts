import bcrypt from 'bcrypt'
import type { AuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from '@/server/prisma'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      // サインインフォームに表示する名前
      name: 'Sign in',

      // 認証情報のラベルとタイプ
      credentials: {
        username: {
          label: 'ユーザー名',
          type: 'text',
          placeholder: 'ユーザー名',
        },
        password: { label: 'パスワード', type: 'password' },
      },

      // サインインフォームの送信時に呼び出される関数
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error('Credentials are required')
        }

        // 渡されたクレデンシャルからユーザー名とパスワードを取り出す
        const { username, password } = credentials

        let user: {
          id: string
          name: string | null
          email: string | null
        } | null = null

        // クレデンシャル側のユーザー名と一致するユーザーをデータベースから取得する
        const ans = await prisma.user.findFirst({
          where: {
            AND: {
              email: {
                contains: username,
              },
            },
          },
        })

        // ユーザーが見つかった場合、パスワードを検証する
        if (ans) {
          const comparePassword = await bcrypt.compare(
            password,
            ans.crypted_password!,
          )
          // パスワードが一致した場合、ユーザー情報を返す
          if (comparePassword) {
            user = { id: ans.id, name: ans.name, email: ans.email }
          }
        }

        if (user) {
          // 返されたオブジェクトはすべて、JWTの `user` プロパティに保存されます。
          return user
        } else {
          // もし、NULLを返した場合は、ユーザーに詳細を確認するよう促すエラーが表示されます。
          return null
        }
      },
    }),
  ],
}

/**
 * Helper function to get the session on the server without having to import the authOptions object every single time
 * @returns The session object or null
 */
export const getSession = () => getServerSession(authOptions)
