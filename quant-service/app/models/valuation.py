from pydantic import BaseModel, Field


class ValuationRequest(BaseModel):
    property_id: str

    annual_rent: float = Field(gt=0)
    operating_expenses: float = Field(ge=0)

    vacancy_rate: float = Field(
        ge=0,
        le=1,
    )

    discount_rate: float = Field(
        gt=0,
        lt=1,
    )

    years: int = Field(
        default=10,
        ge=1,
        le=50,
    )

    temperature_delta: float = 0.0

    hvac_cost_increase: float = Field(
        default=0.0,
        ge=0,
    )


class ValuationResponse(BaseModel):
    property_id: str

    noi: float
    adjusted_noi: float

    cap_rate: float
    estimated_value: float

    temperature_delta: float
    hvac_cost_increase: float