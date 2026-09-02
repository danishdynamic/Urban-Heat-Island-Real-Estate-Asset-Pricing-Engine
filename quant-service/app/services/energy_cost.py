from pydantic import BaseModel, Field


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


def calculate_energy_cost(
    request: EnergyCostRequest,
) -> EnergyCostResult:

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