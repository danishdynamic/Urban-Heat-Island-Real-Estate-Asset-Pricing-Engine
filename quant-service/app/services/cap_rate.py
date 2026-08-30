def calculate_cap_rate(
    noi: float,
    property_value: float,
) -> float:

    if property_value <= 0:
        return 0.0

    return noi / property_value