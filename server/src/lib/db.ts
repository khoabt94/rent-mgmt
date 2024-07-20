import { ConfigService } from "@nestjs/config"
import { ENV_KEY } from "src/constants"
import { UserSchema } from "src/modules/auth/schemas/user.schemas"

export async function connectMongoDB(configService: ConfigService) {
  const DATABASE_URL = configService.get<string>(ENV_KEY.DATABASE_URL)
  const DATABASE_PASSWORD = configService.get<string>(ENV_KEY.DATABASE_PASSWORD)
  const uri = DATABASE_URL.replace('<PASSWORD>', DATABASE_PASSWORD)

  return {
    uri,
  }
}

export function useMongoFactory() {
  const schema = UserSchema;
  schema.plugin(require('mongoose-unique-validator'));
  return schema;
}