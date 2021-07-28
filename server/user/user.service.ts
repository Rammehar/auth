import {injectable, postConstruct} from 'inversify'

import {Database} from '../database'
import {Id} from '../id'
import {UserDocument} from './user.schema'

@injectable()
export class UserService {
  constructor(private database: Database) {}

  @postConstruct()
  async init() {
    await this.database.waitForInitialized()

    const collection = await this.usersCollection()
    await collection.createIndexes(
      [
        {key: {id: 1}, name: 'id'},
        {key: {gitHubUserId: 1}, name: 'googleUserId'},
      ],
      {unique: true}
    )
  }

  async getByGitHubUserId(gitHubUserId: number) {
    const collection = await this.usersCollection()
    return collection.findOne({gitHubUserId: gitHubUserId.toString()})
  }

  async create(name: string, gitHubUserId: number): Promise<UserDocument> {
    const collection = await this.usersCollection()
    const user = {
      id: Id.generate().toString(),
      name,
      tokenVersion: 0,
      gitHubUserId: gitHubUserId.toString(),
    }
    const result = await collection.insertOne(user)
    if (result.acknowledged) return user
    throw new Error()
  }

  private usersCollection() {
    return this.database.collection<UserDocument>('users')
  }
}