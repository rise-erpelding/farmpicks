const FilteredFarmsService = {
  setFilteredFarms(farms) {
    return window.sessionStorage.setItem('filteredFarms', farms)
  },
  getFilteredFarms() {
    return window.sessionStorage.getItem('filteredFarms')
  },
  clearFilteredFarms() {
    return window.sessionStorage.removeItem('filteredFarms')
  },
  hasFilteredFarms() {
    return !!FilteredFarmsService.getFilteredFarms()
  },
}

export default FilteredFarmsService
