/** In-memory filtering hook shared by the entity information pages. */
import { useMemo, useState } from "react";

interface FilterableData {
	[key: string]: any;
}

interface FilteredData extends FilterableData {
	hidden: boolean;
}

/**
 * Filters an in-memory data list by key/value pairs and marks each item visibility.
 *
 * @param datas Source collection to filter.
 * @param defaultKey Initial property used by the text filter.
 * @returns Filter state, setter and the collection decorated with a hidden flag.
 */
export function useFilterData<T extends FilterableData>(datas: T[] = [], defaultKey = "name") {
	const [filters, setFilters] = useState<Record<string, string>>({ [defaultKey]: "" });

	/**
	 * Updates a filter key without discarding the rest of the active filters.
	 *
	 * @param key Property name used for filtering.
	 * @param value Filter value applied to the property.
	 */
	const setFilter = (key: string, value: string) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const filteredDatas = useMemo(() => {
		if (!Array.isArray(datas)) return [] as (T & FilteredData)[];

		return datas.map((data) => {
			let visible = true;

			for (const [key, value] of Object.entries(filters)) {
				if (value && !data[key]?.toLowerCase?.().includes(value.toLowerCase())) {
					visible = false;
					break;
				}
			}

			return { ...data, hidden: !visible } as T & FilteredData;
		});
	}, [datas, filters]);

	return { filteredDatas, filters, setFilter };
}
