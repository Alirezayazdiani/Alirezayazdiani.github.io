---
layout: page
title: Railway Operations Optimization Under Disruptions
description: Integer programming model for train rescheduling in disrupted urban and interurban rail networks, achieving 88% reduction in computational time
img: assets/img/4.jpg
importance: 4
category: research
related_publications: true
---

## Overview

This project develops an **Integer Programming (IP)** model for real-time train rescheduling in disrupted urban and interurban rail networks. When incidents — equipment failures, track blockages, or unexpected delays — cascade through a rail network, operators need fast, reliable rescheduling decisions. This model provides optimal or near-optimal rescheduling plans within operational time constraints, enabling the **digitalization of railway operations**.

## Motivation

Rail disruptions cause significant passenger delays and can propagate across entire networks. Manual rescheduling by dispatchers is slow and suboptimal. Automated optimization models that can rapidly recompute schedules — accounting for train order, platform availability, connection protection, and crew constraints — are essential for modern rail operations management.

## Methods

- **Integer Programming formulation** capturing:
  - Train order and headway constraints
  - Platform and track capacity
  - Connection protection between services
  - Crew and rolling stock feasibility
- **Solver:** IBM **CPLEX** with branch-and-bound
- **Algorithmic enhancements:** Advanced scheduling algorithms and metaheuristics (Genetic Algorithm, Simulated Annealing) for large-scale networks
- **Case studies:** Urban metro and interurban rail disruption scenarios

## Key Results

- Achieved an **88% reduction in computational time** compared to baseline formulations through algorithmic improvements
- The model produces feasible rescheduling plans within operational time windows required by dispatchers
- Applicable to both urban metro disruptions and long-distance interurban network incidents

## Publication

{% cite bafandkar2025railway %}
