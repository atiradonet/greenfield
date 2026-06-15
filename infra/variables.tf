variable "resource_group_name" {
  type        = string
  description = "Name of the Azure resource group."
  default     = "housing-notes-rg"
}

variable "location" {
  type        = string
  description = "Azure region."
  default     = "eastus"
}

variable "cluster_name" {
  type        = string
  description = "Name of the AKS cluster."
  default     = "housing-notes-aks"
}

variable "node_count" {
  type        = number
  description = "Number of nodes in the default node pool."
  default     = 2
}

variable "node_vm_size" {
  type        = string
  description = "VM size for the default node pool."
  default     = "Standard_DS2_v2"
}
