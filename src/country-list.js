import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Country from "./country";
import { useSelector, useDispatch } from "react-redux";

const CountryListStyled = styled.div`
	display: grid;
	justify-content: center;
	grid-row-gap: 2.3em;
	background: var(--background);
	padding: 4em 2em;
`;

function CountryList() {
	const dispatch = useDispatch();
	const countryList = useSelector((state) => state.countryList);
	console.log("Estado:", countryList);

	//const [countryList, SetCountryList] = useState([]);
	useEffect(() => {
		fetch("http://restcountries.eu/rest/v2/all")
			.then((response) => {
				return response.json();
			})
			.then((list) => {
				dispatch({
					type: "SET_COUNTRY_LIST",
					payload: list,
				});
				// SetCountryList(data);
				console.log(list.length);
			})
			.catch(() => {
				console.log("Hubo un error");
			});
	}, []);
	return (
		<CountryListStyled>
			{countryList.map(
				({ name, flag, population, region, capital, alpha2Code }) => {
					return (
						<Country
							key={alpha2Code}
							flag={flag}
							name={name}
							population={population}
							region={region}
							capital={capital}
						/>
					);
				}
			)}
		</CountryListStyled>
	);
}

export default CountryList;
