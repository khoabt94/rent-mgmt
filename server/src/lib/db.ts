import { ConfigService } from "@nestjs/config"
import { ENV_KEY } from "src/constants"

export async function connectMongoDB(configService: ConfigService) {
  const DATABASE_URL = configService.get<string>(ENV_KEY.DATABASE_URL)
  const DATABASE_PASSWORD = configService.get<string>(ENV_KEY.DATABASE_PASSWORD)
  const uri = DATABASE_URL.replace('<PASSWORD>', DATABASE_PASSWORD)

  return {
    uri,
  }
}