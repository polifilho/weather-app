package utils

func GetField(dailyData map[string]interface{}, key string) []interface{} {
	field, ok := dailyData[key].([]interface{})
	if !ok {
		return []interface{}{}
	}
	return field
}

func ConvertToFloat64Slice(input []interface{}) []float64 {
	result := make([]float64, len(input))
	for i, v := range input {
		if val, ok := v.(float64); ok {
			result[i] = val
		} else {
			result[i] = 0
		}
	}
	return result
}

func ConvertToStringSlice(input []interface{}) []string {
	result := make([]string, len(input))
	for i, v := range input {
		if val, ok := v.(string); ok {
			result[i] = val
		} else {
			result[i] = ""
		}
	}
	return result
}

func ConvertToIntSlice(input []interface{}) []int {
	result := make([]int, len(input))
	for i, v := range input {
		if val, ok := v.(float64); ok {
			result[i] = int(val)
		} else {
			result[i] = 0
		}
	}
	return result
}
