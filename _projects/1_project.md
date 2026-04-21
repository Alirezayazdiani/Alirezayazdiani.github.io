---
layout: page
title: Hydrogen Refueling Infrastructure Optimization
description: Siting green and blue hydrogen refueling stations along freight corridors using MILP optimization
img: assets/img/1.jpg
importance: 1
category: research
related_publications: true
---

## Overview

This project develops a **Mixed Integer Linear Programming (MILP)** optimization framework for the strategic siting of hydrogen refueling stations (HRS) along major freight corridors. The framework simultaneously accounts for **green hydrogen** (electrolysis from renewables) and **blue hydrogen** (natural gas + carbon capture) supply chains to minimize total infrastructure cost while ensuring adequate coverage for heavy-duty freight vehicles.

## Motivation

Heavy-duty freight trucks contribute disproportionately to transportation greenhouse gas emissions. Hydrogen fuel cell trucks offer a zero-tailpipe-emission alternative, but deployment depends critically on refueling infrastructure availability. Without strategically placed stations, the chicken-and-egg problem prevents adoption. This work provides a decision-support tool for infrastructure planners and policymakers to cost-effectively deploy HRS networks along freight corridors.

## Methods

- **MILP formulation** solved with **Gurobi** for station location-allocation decisions
- **Dual supply chain modeling:** green (electrolysis) and blue (SMR + CCS) hydrogen with distinct cost structures and emissions profiles
- **Freight flow demand:** origin-destination freight data used to estimate hydrogen demand at corridor candidate sites
- **Coverage constraints:** station spacing ensures compatibility with fuel cell truck operating ranges

## Key Results

- Integrated production-and-siting co-optimization substantially reduces costs compared to sequential planning
- Blue hydrogen provides near-term cost competitiveness; green hydrogen becomes dominant as renewable energy costs decline
- The model identifies station clusters at high-demand corridor nodes that maximize fleet coverage per dollar invested

## Publication

{% cite park2026hydrogen %}
