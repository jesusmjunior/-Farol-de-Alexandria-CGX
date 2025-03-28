#!/bin/bash

# Nome do serviço
SERVICE_NAME=farol-alexandria-ui

# Região do Cloud Run
REGION=southamerica-east1

# Projeto no Google Cloud
PROJECT_ID=$(gcloud config get-value project)

# Build e Deploy
gcloud builds submit --tag gcr.io/$PROJECT_ID/$SERVICE_NAME

gcloud run deploy $SERVICE_NAME \
  --image gcr.io/$PROJECT_ID/$SERVICE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --min-instances 1 \
  --max-instances 2

# Obter URL do serviço
gcloud run services describe $SERVICE_NAME --region $REGION --format "value(status.url)"
