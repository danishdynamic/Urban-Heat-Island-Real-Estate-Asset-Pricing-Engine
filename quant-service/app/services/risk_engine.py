from app.models.scenario import (
    ClimateScenario,
    ScenarioResult,
)
from app.services.energy_cost import (
    calculate_energy_cost,
    EnergyCostRequest,
)
from app.services.quantlib_engine import (
    calculate_dcf_quantlib,
)


def run_scenario_analysis(
    base_noi: float,
    base_hvac_cost: float,
    discount_rate: float,
    years: int,
    scenarios: list[ClimateScenario],
) -> list[ScenarioResult]:

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
                temperature_delta=
                    scenario.temperature_delta,
                sensitivity_per_degree=
                    scenario.hvac_sensitivity,
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

        value_change_percentage = (
            value_change / base_value
            if base_value
            else 0
        )

        results.append(
            ScenarioResult(
                name=scenario.name,
                temperature_delta=
                    scenario.temperature_delta,
                additional_hvac_cost=
                    round(
                        energy_result.additional_cost,
                        2,
                    ),
                adjusted_noi=
                    round(adjusted_noi, 2),
                estimated_value=
                    round(estimated_value, 2),
                value_change=
                    round(value_change, 2),
                value_change_percentage=
                    round(
                        value_change_percentage,
                        4,
                    ),
            )
        )

    return results