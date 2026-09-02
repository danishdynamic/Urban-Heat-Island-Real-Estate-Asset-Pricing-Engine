from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.models.scenario import ClimateScenario
from app.services.risk_engine import (
    run_scenario_analysis,
)


router = APIRouter(
    prefix="/risk",
    tags=["risk"],
)


class RiskRequest(BaseModel):
    base_noi: float = Field(gt=0)

    base_hvac_cost: float = Field(
        ge=0,
    )

    discount_rate: float = Field(
        gt=0,
        lt=1,
    )

    years: int = Field(
        ge=1,
        le=50,
    )

    scenarios: list[ClimateScenario]


@router.post("/scenario")
def scenario_analysis(
    request: RiskRequest,
):
    return {
        "scenarios": run_scenario_analysis(
            base_noi=request.base_noi,
            base_hvac_cost=
                request.base_hvac_cost,
            discount_rate=
                request.discount_rate,
            years=request.years,
            scenarios=request.scenarios,
        )
    }