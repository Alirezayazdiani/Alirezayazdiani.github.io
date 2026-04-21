---
layout: page
title: Time-Dependent EV Routing for Shared Mobility
description: Optimization framework for electric vehicle routing with time-varying travel times and shared mobility integration
img: assets/img/2.jpg
importance: 2
category: research
related_publications: true
---

## Overview

This project presents a comprehensive **optimization framework** for the **Time-Dependent Electric Vehicle Routing Problem (TD-EVRP)** integrated with shared mobility services. Unlike classical routing problems, this framework explicitly captures time-varying travel times, nonlinear battery charging functions, and the coordination of multiple passengers within a shared ridesharing system — a critical step toward **smart city** mobility.

## Motivation

Urban transportation systems face dual pressures: reducing emissions through vehicle electrification and improving efficiency through ride-sharing. Electric vehicles introduce new constraints (range anxiety, charging time, nonlinear charging curves) that interact with the combinatorial complexity of shared mobility routing. Existing models treat these challenges separately; this work addresses them jointly.

## Methods

- **Mathematical Programming:** Mixed Integer Programming (MIP) formulation capturing:
  - Time-dependent arc travel times (peak/off-peak variation)
  - Nonlinear battery state-of-charge dynamics
  - Passenger pickup/delivery coordination with time windows
  - En-route charging scheduling at public charging stations
- **Solvers:** Implemented and solved using **CPLEX** and **Gurobi**
- **Metaheuristics:** Genetic Algorithm and Simulated Annealing for large-scale instances

## Key Results

- The framework achieves a **17% reduction in private vehicle miles traveled** compared to non-shared EV routing
- Nonlinear charging modeling significantly improves solution feasibility vs. linear approximations
- Time-dependent travel times reduce total fleet energy consumption by avoiding peak congestion windows

## Publication

{% cite yazdiani2026evrp %}
