import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit {

  @ViewChild('transactions') transactions: any;

  categories: Array<any> = [
    { title: 'All transactions',   value: 'all',               icon: ''},
    { title: 'Sent',               value: 'sent_to',              icon: 'send'},
    { title: 'Received',           value: 'receive',           icon: 'receive'},
    { title: 'Staked',             value: 'mint_by_stake',             icon: 'stake'},
    { title: 'Mined',  value: 'mined', icon: 'transfer'},
    { title: 'Masternode Reward',  value: 'masternode_reward', icon: 'transfer'},
    { title: 'Balance Transfers',  value: 'payment_to_yourself', icon: 'transfer'},
    // { title: 'Immature',         value: 'immature'          },
    // { title: 'Coinbase',         value: 'coinbase'          },
    // { title: 'Orphan',           value: 'orphan'            },
    // { title: 'Orphaned stake',   value: 'orphaned_stake'    },
  ];

  sortings: Array<any> = [
    { title: 'By time',                  value: 'time'          },
    { title: 'By amount',                value: 'amount'        },
    { title: 'By address',               value: 'address'       },
    { title: 'By category',              value: 'category'      },
    { title: 'By confirmations',         value: 'confirmations' },
    { title: 'By transaction ID (txid)', value: 'txid'          }
  ];

  types: Array<any> = [
    { title: 'All types', value: 'all'      },
    { title: 'Public',  value: 'standard'   },
  ];

  filters: any = {
    category: undefined,
    search:   undefined,
    sort:     undefined,
    type:     undefined
  };

  public selectedTab: number = 0;

  constructor() {
    this.default();
  }

  ngOnInit(): void {
    /* may be used if we concatenate some filters http://bit.ly/2Buav9B */
  }

  default(): void {
    this.selectedTab = 0;
    this.filters = {
      category: 'all',
      type:     'all',
      sort:     'time',
      search:   ''
    };
  }

  changeCategory(index: number): void {
    this.selectedTab = index;
    this.transactions.resetPagination();
    this.filters.category = this.categories[index].value;
    this.filter();
  }

  sortList(event: any): void {
    this.filters.sort = event.value;
    this.filter();
  }

  filter(): void {
    this.transactions.filter(this.filters);
  }

  clear(): void {
    this.default();
    this.filter();
  }
}
