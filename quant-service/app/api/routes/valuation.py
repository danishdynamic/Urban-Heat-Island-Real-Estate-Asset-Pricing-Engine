from fastapi import APIRouter

from app.models.valuation import (
    ValuationRequest,
    ValuationResponse,
)

from app.services.dcf import calculate_property_value
from app.services.cap_rate import calculate_cap_rate


router = APIRouter(
    prefix="/valuation",
    tags=["valuation"],
)


@router.post(
    "/dcf",
    response_model=ValuationResponse,
)
def calculate_valuation(
    request: ValuationRequest,
):

    effective_rent = (
        request.annual_rent
        * (1 - request.vacancy_rate)
    )

    noi = (
        effective_rent
        - request.operating_expenses
    )

    hvac_cost = (
        request.operating_expenses
        * request.hvac_cost_increase
    )

    adjusted_noi = noi - hvac_cost

    estimated_value = calculate_property_value(
        annual_cash_flow=adjusted_noi,
        discount_rate=request.discount_rate,
        years=request.years,
    )

    cap_rate = calculate_cap_rate(
        adjusted_noi,
        estimated_value,
    )

    return ValuationResponse(
        property_id=request.property_id,
        noi=noi,
        adjusted_noi=adjusted_noi,
        cap_rate=cap_rate,
        estimated_value=estimated_value,
        temperature_delta=request.temperature_delta,
        hvac_cost_increase=request.hvac_cost_increase,
    )