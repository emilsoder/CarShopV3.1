import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuctionFilterService} from "../../services/sidebar-filter.service";
import {GlobalState} from "../../../shared/observers/_global";
import {AuctionFilterPipe} from "../../pipes/auction-filter.pipe";
import {FilterViewModel} from "../../models/FilterViewModel";
import {OrderByPipe} from "../../../shared/pipes/orderby.pipe";

@Component({
  moduleId: module.id.toString(),
  selector: "sidebar-filter",
  templateUrl: 'auction-filter.component.html',
  styleUrls: ["auction-filter.component.css"],
  providers: [OrderByPipe]
})

export class AuctionFilterComponent implements OnInit, OnDestroy {
  public makers: string[] = [];
  public colors: string[] = [];
  private sub1: string = "rangeFilterChanged";
  private sub2: string = "brands";
  private sub3: string = "colors";

  constructor(private filterService: AuctionFilterService,
              private _state: GlobalState) {
  }

  public _currentFilter: FilterViewModel = this.currentFilter;

  get currentFilter(): FilterViewModel {
    return this._currentFilter = AuctionFilterPipe.filterViewModel;
  }

  set currentFilter(value: FilterViewModel) {
    this._currentFilter = value;
    AuctionFilterPipe.filterViewModel = this._currentFilter;
  }

  ngOnInit() {
    AuctionFilterComponentScripts.setJqueryEvents();
    this.subscribeToFilterEvents();
  }

  public setColors(color: string) {
    console.log(color);
    if (this._currentFilter.colors.find(x => x == color))
      this._currentFilter.colors = this._currentFilter.colors.filter(e => e !== color);

    else
      this._currentFilter.colors.push(color);
    console.log(this._currentFilter);
    this._state.notifyDataChanged('filter', this._currentFilter);
  }

  public setBrand(brand: string) {
    if (brand === 'any') this._currentFilter.brands = [];
    else if (this._currentFilter.brands.find(x => x == brand))
      this._currentFilter.brands = this._currentFilter.brands.filter(e => e !== brand);
    else this._currentFilter.brands.push(brand);
    this._state.notifyDataChanged('filter', this._currentFilter);
  }

  public notifyDataChanged(): void {
    this._state.notifyDataChanged('filter', this._currentFilter);
  }

  ngOnDestroy(): void {
    this._state.unsubscribe(this.sub1);
    this._state.unsubscribe(this.sub2);
    this._state.unsubscribe(this.sub3);
  }

  private subscribeToFilterEvents() {
    this._state.subscribe('rangeFilterChanged', (filter: FilterViewModel) => (this._currentFilter = filter));
    this._state.subscribe("brands", (brands: string[]) => (this.makers = brands));
    this._state.subscribe('colors', (colors: string[]) => (this.colors = colors));
  }
}

export class AuctionFilterComponentScripts {
  public static setJqueryEvents(): void {
    let hasBeenCollapsed = 0;
    $(function () {
      onWindowResize(false);

      $(".filter-sidebar-item-header").click(function () {
        $(this).parent().find(".panel-collapse")
          .fadeToggle("fast")
          .collapse("toggle");
      });

      $(window).resize(function () {
        onWindowResize(true);
      });

      $("#auction-filter-toggle-panel-btn").click(function () {
        if ($(window).width() < 750)
          $("#auction-filter-panel-body").collapse("toggle");
      });

      function onWindowResize(isResizeEvent) {
        const windowWidth = $(window).width();

        if (windowWidth < 750) {
          $(".auction-filter-panel-body").collapse("hide");
          hasBeenCollapsed = 1;
        } else if (windowWidth > 750) {
          $(".auction-filter-panel-body").collapse("show");
          hasBeenCollapsed = 0;
        }
        if (windowWidth < 900) {
          $("#mySidebar").css("z-index", 1);
        }
        else if (windowWidth > 900) {
          hasBeenCollapsed = 0;
          $("#mySidebar")
            .css("display", "block")
            .css("z-index", 0);
          $(".auction-filter-panel-body").collapse("show");
        }
      }
    });
  }
}

