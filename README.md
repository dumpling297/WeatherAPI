#### WeatherAPI
<p align="center">
<a href="https://travis-ci.org/HealPot/WeatherAPI"><img src="https://travis-ci.org/HealPot/WeatherAPI.svg?branch=master" alt="Travis CI" /></a>
<a href="http://www.gnu.org/licenses/gpl-3.0"><img src="https://badges.frapsoft.com/os/gpl/gpl.svg?v=102" alt="License" /></a>
<a href="https://github.com/HealPot/WeatherAPI"><img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=102" alt="OpenSource" /></a>
</p>

## Introduction
This is an API application that allows users to check current temperature.

## Parameters
*`?scale=Celsius`
*`?scale=Fahrenheit`

## API Usage
*`GET /locations/{zip-code}`
*Example usage `GET /locations/94305?scale=Celsius`

## Install
The application is available at `http://localhost:8080` after invoking `npm install` followed by `npm start`

## Planned
* Callback implementation.
* Code coverage.