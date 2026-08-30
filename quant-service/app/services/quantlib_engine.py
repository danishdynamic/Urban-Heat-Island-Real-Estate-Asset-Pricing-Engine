import QuantLib as ql
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


def calculate_dcf_quantlib(
    annual_cash_flow: float,
    discount_rate: float,
    years: int,
) -> float:
    """Calculates present value using QuantLib FlatForward yield curves."""
    today = ql.Date.todaysDate()
    ql.Settings.instance().evaluationDate = today

    calendar = ql.NullCalendar()
    day_counter = ql.Actual365Fixed()

    # Construct QuantLib Yield Curve using the discount rate
    rate_quote = ql.QuoteHandle(ql.SimpleQuote(discount_rate))
    yield_curve = ql.FlatForward(
        today, rate_quote, day_counter, ql.Compounded, ql.Annual
    )

    total_value = 0.0

    for year in range(1, years + 1):
        payment_date = calendar.advance(today, ql.Period(year, ql.Years))

        # Retrieve discount factor dynamically from QuantLib curve
        discount_factor = yield_curve.discount(payment_date)

        # Discount cash flow using QuantLib factor
        total_value += annual_cash_flow * discount_factor

    return total_value


def calculate_valuation(request: ValuationRequest) -> dict:
    """Calculates Net Operating Income (NOI) and total property value."""
    # 1. Base Net Operating Income (NOI) calculation
    effective_gross_income = request.annual_rent * (1 - request.vacancy_rate)
    noi = effective_gross_income - request.operating_expenses

    # 2. Adjust NOI for HVAC climate cost impact
    adjusted_noi = noi - request.hvac_cost_increase

    # 3. Discount Adjusted Cash Flows over holding period
    estimated_value = calculate_dcf_quantlib(
        annual_cash_flow=adjusted_noi,
        discount_rate=request.discount_rate,
        years=request.years,
    )

    # Implied Cap Rate
    cap_rate = adjusted_noi / estimated_value if estimated_value > 0 else 0.0

    return {
        "property_id": request.property_id,
        "noi": round(noi, 2),
        "adjusted_noi": round(adjusted_noi, 2),
        "cap_rate": round(cap_rate, 4),
        "estimated_value": round(estimated_value, 2),
        "temperature_delta": request.temperature_delta,
        "hvac_cost_increase": request.hvac_cost_increase,
    }