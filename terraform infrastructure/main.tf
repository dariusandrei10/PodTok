locals {
  stack = "${var.app}-${var.env}-${var.location}"

  default_tags = {
    environment = var.env
    owner       = "Darius Dragomir"
    app         = var.app
  }

}

resource "azurerm_resource_group" "podtok" {
  name     = "rg-${local.stack}"
  location = var.region

  tags = local.default_tags
}

resource "azurem_container_registry" "podtok"{
  name                = "podtokacr"
  resource_group_name = azurerm_resource_group.podtok.name
  location            = azurerm_resource_group.podtok.location
  sku                 = "Basic"
  admin_enabled       = true

  tags = local.default_tag
}


resource "azurerm_log_analytics_workspace" "podtok" {
  name                = "log-${local.stack}"
  location            = azurerm_resource_group.podtok.location
  resource_group_name = azurerm_resource_group.podtok.name

  tags = local.default_tags
}