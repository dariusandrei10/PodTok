#!/usr/bin/env bash

RESOURCE_GROUP_NAME="podtok-rg-tf-nou"
STORAGE_ACCOUNT_NAME="podtoktfsa$RANDOM"
LOCATION="centralus"

# 1. Create Resource Group
az group create -l $LOCATION -n $RESOURCE_GROUP_NAME

# 2. Create Storage Account
az storage account create -n $STORAGE_ACCOUNT_NAME -g $RESOURCE_GROUP_NAME -l $LOCATION --sku Standard_LRS

# 3. Create Storage Account blob container
az storage container create --name tfstate --account-name $STORAGE_ACCOUNT_NAME --auth-mode login

echo "Storage Account creat cu succes: $STORAGE_ACCOUNT_NAME"