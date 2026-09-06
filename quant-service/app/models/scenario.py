from pydantic import BaseModel, Field

class ClimateScenario(BaseModel):
    name: str
    temperature_delta: float
    hvac_sensitivity: float = Field(
        default=0.08,
        ge=0,
    )

class ScenarioResult(BaseModel):
    name: str
    temperature_delta: float
    additional_hvac_cost: float
    adjusted_noi: float
    estimated_value: float
    value_change: float
    value_change_percentage: float
    value_at_risk: float
    value_at_risk_percentage: float