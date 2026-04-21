---
layout: page
title: AI-Driven Urban Air Mobility with Modular Aerial Pods
description: MINLP optimization model for dynamic scheduling of modular aerial pod fleets using AI-driven demand forecasting
img: assets/img/5.jpg
importance: 5
category: research
related_publications: true
---

## Overview

This project designs an **AI-powered optimization framework** for next-generation **Urban Air Mobility (UAM)** systems using modular aerial pods. As cities explore vertical transportation to relieve ground-level congestion, effective fleet management — dynamically assigning, routing, and scheduling modular pods across a vertiport network — becomes critical. This work combines **Mixed Integer Nonlinear Programming (MINLP)** with AI-driven demand forecasting to achieve adaptive, efficient UAM operations.

## Motivation

Urban Air Mobility promises to transform intra-city transportation using electric vertical takeoff and landing (eVTOL) vehicles. However, the operational complexity of dynamic pod scheduling — matching modular vehicle configurations to fluctuating demand across multiple vertiports while managing battery charging and fleet repositioning — requires sophisticated optimization methods beyond conventional approaches. AI-forecasted demand enables proactive rather than reactive fleet management.

## Methods

- **MINLP formulation** solved with **Gurobi** capturing:
  - Dynamic pod assignment across vertiport network
  - Modular vehicle configuration (pod combinations)
  - Battery state and charging scheduling
  - Fleet repositioning decisions
- **AI demand forecasting:** Machine learning models predict spatiotemporal passenger demand to drive proactive fleet positioning
- **Adaptive scheduling:** Real-time demand updates feed back into the optimization loop

## Key Results

- The integrated AI-optimization framework improves **operational efficiency** and **resource utilization** compared to static scheduling
- Modular pod configurations allow flexible capacity matching to demand variability
- The model provides a computational foundation for real-world UAM fleet management systems

## Publication

{% cite shafiee2025airtransit %}
