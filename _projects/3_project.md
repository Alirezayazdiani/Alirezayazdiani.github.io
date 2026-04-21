---
layout: page
title: Spatiotemporal PM2.5 Hotspot Detection with Machine Learning
description: XGBoost-based models achieving 93% accuracy for identifying persistent air quality hotspots across urban transportation networks
img: assets/img/ml_pm25_ga.jpg
importance: 3
category: research
related_publications: true
---

## Overview

This project applies **spatiotemporal machine learning** to identify persistent fine particulate matter (PM₂.₅) hotspots across urban regions, enabling transportation planners and public health officials to target mitigation strategies where they matter most. Using over a decade of PM₂.₅ monitoring data linked to transportation activity, the models classify high-risk locations with high accuracy and interpretability.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/ml_pm25_ga.jpg" title="Graphical abstract — spatiotemporal PM2.5 hotspot analysis" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Graphical abstract: machine learning in spatiotemporal PM₂.₅ hotspot analysis for better targeted mitigation strategies.
</div>

## Motivation

PM₂.₅ from vehicle exhaust is one of the leading environmental health risks in urban areas, disproportionately affecting low-income and minority communities near high-traffic corridors. However, not all high-PM₂.₅ locations are equally persistent or severe. Identifying **chronic hotspots** — locations that repeatedly exceed thresholds over time — allows policymakers to prioritize interventions such as truck routing restrictions, electrification mandates, and green buffer zones.

## Methods

- **Machine Learning Models:** XGBoost (primary), AutoGluon, and Random Forest ensemble comparison
- **Features:** Spatiotemporal covariates including traffic volume, road type, meteorological conditions, land use, and proximity to freight generators
- **Resampling:** SMOTE applied to address class imbalance in hotspot labels
- **Validation:** Time-based train/test splits to prevent data leakage; spatial cross-validation
- **Interpretability:** SHAP values used to identify the most influential predictors of persistent hotspots

## Key Results

- Achieved **93% classification accuracy** and **88% weighted F1-score** across test locations
- Identified **173 persistent PM₂.₅ hotspots** across the study region warranting targeted intervention
- Traffic volume and proximity to freight activity were the dominant predictors
- Model outputs translated into **decision-support maps** for planners and public health agencies

## Publication

{% cite lu2025pm25 %}
