import {SortDirection} from "../common/sort-direction";

/**
 * Basic information about page
 */
export interface PageInfo {
  /**
   * Size of current page (max. number of items that can be placed on page)
   */
  size: number,

  /**
   * Zero based page number
   */
  idx: number,

  /**
   * Total number of items available for retrieval (pages count = ceil(totalItemsAvailable / size))
   */
  totalItemsAvailable: number,

  /**
   * Directions in which items are sorted
   */
  sortDirection?: SortDirection
}

/**
 * Page of some items
 */
export interface Page<T> extends PageInfo {
  items: T[]
}
