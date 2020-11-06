import { QueryUserArgs } from '../../apollo/typeDefs.gen'
import { ApolloQueryResult } from '@apollo/client'
import { IUserQuery } from '../../types'
import { History } from 'history'

export type LogOutFT = (
  refetch: (
    variables?: Partial<QueryUserArgs> | undefined
  ) => Promise<ApolloQueryResult<IUserQuery>>,
  history: History
) => void
