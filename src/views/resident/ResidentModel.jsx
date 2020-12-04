import React from "react";

import { ModelComponent } from '../common';
import ResidentDomain from 'domains/resident';

class ResidentModel extends ModelComponent {
  domain = ResidentDomain;

  // override to use custom name
  listingResource = () => 'residents';

  mapData = values => {
    const {
      email,
      name,
      location,
    } = values;

    return {
      email,
      name,
      location,
    }
  }

  tabAndFields = () => [
    this.storeTab(),
  ]

  storeTab = () => {
    return {
      name: 'Cadastro',
      rows: [
        {
          name: {
            type: 'text',
            label: 'Nome',
            readOnly: true,
            col: {
              md: 6,
            }
          },
          email: {
            type: 'text',
            label: 'Endereço de e-mail',
            readOnly: true,
          },
        },
        {
          location: {
            type: 'text',
            label: 'Localização no condomínio',
            col: {
              md: 12
            }
          }
        }
      ]
    }
  }
}

export default ResidentModel;