from app.models.scenario import (
    ClimateScenario,
    ScenarioResult,
)
from app.services.energy_cost import (
    calculate_base_hvac_cost,
    calculate_energy_cost,
    EnergyCostRequest,
)
from app.services.quantlib_engine import (
    calculate_dcf_quantlib,
)


def run_scenario_analysis(
    base_noi: float,
    average_daily_energy_kwh: float,
    discount_rate: float,
    years: int,
    scenarios: list[ClimateScenario],
) -> list[ScenarioResult]:

    base_hvac_cost = calculate_base_hvac_cost(
        average_daily_energy_kwh=average_daily_energy_kwh,
    )

    base_value = calculate_dcf_quantlib(
        annual_cash_flow=base_noi,
        discount_rate=discount_rate,
        years=years,
    )

    results = []

    for scenario in scenarios:

        energy_result = calculate_energy_cost(
            EnergyCostRequest(
                base_hvac_cost=base_hvac_cost,
                temperature_delta=scenario.temperature_delta,
                sensitivity_per_degree=scenario.hvac_sensitivity,
            )
        )

        adjusted_noi = (
            base_noi
            - energy_result.additional_cost
        )

        estimated_value = (
            calculate_dcf_quantlib(
                annual_cash_flow=adjusted_noi,
                discount_rate=discount_rate,
                years=years,
            )
        )

        value_change = (
            estimated_value - base_value
        )

        value_at_risk = max(
            base_value - estimated_value,
            0,
        )

        value_at_risk_percentage = (
            value_at_risk / base_value
            if base_value
            else 0
        )

        value_change_percentage = (
            value_change / base_value
            if base_value
            else 0
        )

        results.append(
            ScenarioResult(
                name=scenario.name,
                temperature_delta=scenario.temperature_delta,
                additional_hvac_cost=round(
                    energy_result.additional_cost,
                    2,
                ),
                adjusted_noi=round(adjusted_noi, 2),
                estimated_value=round(estimated_value, 2),
                value_change=round(value_change, 2),
                value_change_percentage=round( value_change_percentage, 4,),
                value_at_risk=round( value_at_risk, 2,),
                value_at_risk_percentage=round( value_at_risk_percentage, 4,),
                ),
            )

    return results