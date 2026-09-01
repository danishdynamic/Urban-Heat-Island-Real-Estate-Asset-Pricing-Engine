from .quantlib_engine import calculate_dcf_quantlib


def calculate_property_value(
    annual_cash_flow: float,
    discount_rate: float,
    years: int,
) -> float:

    return calculate_dcf_quantlib(
        annual_cash_flow=annual_cash_flow,
        discount_rate=discount_rate,
        years=years,
    )