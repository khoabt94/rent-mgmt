import { ConfigService } from "@nestjs/config"
import { ENV_KEY } from "src/constants"

export async function useJWTServiceFactory(configService: ConfigService) {
  const secretOrPrivateKey = configService.get<string>(ENV_KEY.JWT_SECRET)
  const expiresIn = configService.get<string>(ENV_KEY.JWT_EXPIRE)

  return {
    secretOrPrivateKey,
    signOptions: {
      expiresIn
    }
  }
}