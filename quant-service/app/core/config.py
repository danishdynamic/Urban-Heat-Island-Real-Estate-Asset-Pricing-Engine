from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "urban-heat-quant-service"
    environment: str = "development"
    host: str = "0.0.0.0"
    port: int = 8000
    log_level: str = "INFO"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()