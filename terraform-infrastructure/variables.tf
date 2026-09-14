variable "region" {
  description = "Azure infrastructure region"
  type        = string
  default     = "eastus"
}

variable "app" {
  description = "Name of the application, used in Azure resource naming"
  type        = string
  default     = "podtok"
}

variable "env" {
  description = "Application env"
  type        = string
  default     = "dev"
}

variable "location" {
  description = "Location short name "
  type        = string
  default     = "eus"
}
