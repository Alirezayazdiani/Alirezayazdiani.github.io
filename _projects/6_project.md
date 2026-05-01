---
layout: page
title: UTECH-NYC — Urban Transportation, Environment, and Community Health
description: Integrated modeling platform quantifying traffic-related PM2.5 emissions, air quality, and exposure risks across New York City under congestion pricing and electrification scenarios
img: assets/img/projects/cover-utech-nyc.png
importance: 6
category: research
related_publications: true
---

## Overview

**UTECH-NYC** is a large-scale integrated modeling platform designed to quantify the relationships between urban transportation activity, fine particulate matter (PM₂.₅) emissions, air quality, and community-level health exposure across New York City. The platform evaluates the equity and environmental impacts of transformative transportation policies — including **congestion pricing** and **vehicle electrification** — at fine spatial and temporal resolution.

## Motivation

Transportation is the largest source of greenhouse gas emissions in the United States, and urban areas like New York City face acute air quality and environmental justice challenges. Low-income communities and communities of color near major roadways experience disproportionate PM₂.₅ exposure. Quantifying how policies like the NYC congestion pricing program affect not only traffic volumes but also emissions, air quality, and health exposure across different communities is essential for equitable policy design.

## Methods

- **Transportation Modeling:** Link-level traffic volume and speed data from the New York Best Practice Model
- **Emissions Modeling:** EPA MOVES integrated for vehicle emission rate estimation at fine spatial resolution (20m × 20m grid)
- **Air Quality Modeling:** Dispersion modeling to translate emissions to ground-level PM₂.₅ concentrations
- **Exposure Analysis:** Population-weighted exposure estimates by census tract, stratified by demographic groups
- **Python ETL Pipelines:** Large-scale data integration across traffic, emissions, meteorological, and demographic datasets
- **Scenario Analysis:** Congestion pricing (Central Business District tolling), fleet electrification, and combined policy scenarios

## Key Results

- Provides high-resolution (20m × 20m spatial, hourly temporal) PM₂.₅ mapping across NYC's road network
- Quantifies differential exposure reduction across income and racial demographic groups under each policy scenario
- Demonstrates that congestion pricing alone reduces PM₂.₅ exposure but electrification achieves broader and more equitable health benefits
- Supports environmental justice analysis by linking transportation policy to community health outcomes

## Publication

{% cite lu2025utech %}
