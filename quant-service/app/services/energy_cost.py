from pydantic import BaseModel, Field

from app.core.assumptions import (
    DAYS_PER_YEAR,
    ENERGY_PRICE_EUR_PER_KWH,
    HVAC_ENERGY_SHARE,
)


class EnergyCostRequest(BaseModel):
    base_hvac_cost: float = Field(ge=0)
    temperature_delta: float
    sensitivity_per_degree: float = Field(
        default=0.08,
        ge=0,
    )


class EnergyCostResult(BaseModel):
    base_hvac_cost: float
    temperature_delta: float
    increase_percentage: float
    additional_cost: float
    adjusted_hvac_cost: float


def calculate_base_hvac_cost(
    average_daily_energy_kwh: float,
) -> float:
    """Stage 1: Converts daily energy consumption to baseline annual HVAC cost

    using global assumptions (kWh price, HVAC share, days per year).
    """
    annual_energy_kwh = average_daily_energy_kwh * DAYS_PER_YEAR
    annual_energy_cost = annual_energy_kwh * ENERGY_PRICE_EUR_PER_KWH
    base_hvac_cost = annual_energy_cost * HVAC_ENERGY_SHARE

    return round(base_hvac_cost, 2)


def calculate_energy_cost(
    request: EnergyCostRequest,
) -> EnergyCostResult:
    """Stage 2: Applies climate scenario temperature shifts and per-degree

    sensitivity to determine additional HVAC cost impact.
    """
    increase_percentage = (
        max(request.temperature_delta, 0)
        * request.sensitivity_per_degree
    )

    additional_cost = (
        request.base_hvac_cost
        * increase_percentage
    )

    adjusted_hvac_cost = (
        request.base_hvac_cost
        + additional_cost
    )

    return EnergyCostResult(
        base_hvac_cost=request.base_hvac_cost,
        temperature_delta=request.temperature_delta,
        increase_percentage=round(
            increase_percentage,
            4,
        ),
        additional_cost=round(
            additional_cost,
            2,
        ),
        adjusted_hvac_cost=round(
            adjusted_hvac_cost,
            2,
        ),
    )