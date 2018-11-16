module.exports.getFlightinBudget = (jsonFlight, budget) => {
  target = []
	let routeInBudget = jsonFlight.Quotes.filter((x, i) => {
    if (jsonFlight.Quotes[i].MinPrice < budget) return x
  })
  routeInBudget.map((x, i) => {
    let dsx = routeInBudget[i].OutboundLeg.DestinationId
    return routeInBudget[i].place = jsonFlight.Places.filter((x, i) => { 
      if (jsonFlight.Places[i].PlaceId === dsx) { return x }
    })
  })
  routeInBudget.map((x, i) => {
    jsonFlight.Carriers.filter((x2,i2) => {
      if (jsonFlight.Carriers[i2].CarrierId === x.OutboundLeg.CarrierIds[0]) {
        x.OutboundLeg.FlightName = x2.Name
      } else if (jsonFlight.Carriers[i2].CarrierId === x.InboundLeg.CarrierIds[0]) {
        x.InboundLeg.FlightName = x2.Name
      }
    })
    target.push({
      city: routeInBudget[i].place[0].CityName,
      country: routeInBudget[i].place[0].CountryName,
      minPrice: routeInBudget[i].MinPrice,
      departureDate: new Date(routeInBudget[i].OutboundLeg.DepartureDate),
      arrivalDate: new Date(routeInBudget[i].InboundLeg.DepartureDate),
      departureFlight: x.OutboundLeg.FlightName,
      arrivalFlight: x.InboundLeg.FlightName ? x.InboundLeg.FlightName : x.OutboundLeg.FlightName
    })
  })
  return target.sort((a,b) => (a.minPrice > b.minPrice) ? 1 : ((b.minPrice > a.minPrice) ? -1 : 0))

}

module.exports.getCheapPrice = (jsonFlight) => {
  target = []
  console.log(Object.keys(jsonFlight))
  jsonFlight.Dates.OutboundDates.map((x, i) => {
    let FlightList = jsonFlight.Dates.OutboundDates[i].QuoteIds.map((x1) => {
      return Object.values(jsonFlight.Quotes.filter((x2,i2) => {
        return jsonFlight.Quotes[i2].QuoteId === x1 ? x2 : ''
      }))[0]
    })
    FlightX = []
    FlightList.map((x3,i3) => {
      jsonFlight.Places.filter((x4,i4) => {
        if (jsonFlight.Places[i4].PlaceId === x3.OutboundLeg.OriginId) {
          x3.OutboundLeg.originCity = x4.Name
        }
        if (jsonFlight.Places[i4].PlaceId === x3.OutboundLeg.DestinationId) {
          x3.OutboundLeg.destinationCity = x4.Name
        }
        if (jsonFlight.Places[i4].PlaceId === x3.InboundLeg.OriginId) {
          x3.InboundLeg.originCity = x4.Name
        }
        if (jsonFlight.Places[i4].PlaceId === x3.InboundLeg.DestinationId) {
          x3.InboundLeg.destinationCity = x4.Name
        }
      })
      jsonFlight.Carriers.filter((x5,i5) => {
        if (jsonFlight.Carriers[i5].CarrierId === x3.OutboundLeg.CarrierIds[0]) {
          x3.OutboundLeg.FlightName = x5.Name
        }
        if (jsonFlight.Carriers[i5].CarrierId === x3.InboundLeg.CarrierIds[0]) {
          x3.InboundLeg.FlightName = x5.Name
        }
      })
    })
    target.push({
      date: jsonFlight.Dates.OutboundDates[i].PartialDate,
      minPrice: jsonFlight.Dates.OutboundDates[i].Price,
      list: FlightList
    })
  })
  return target
}

