from fastapi import APIRouter

from app.api.routes.health import router as health_router
from app.api.routes.valuation import router as valuation_router
from app.api.routes.risk import router as risk_router



router = APIRouter()

router.include_router(health_router)
router.include_router(valuation_router)
router.include_router(risk_router)