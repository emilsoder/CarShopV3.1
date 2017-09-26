import {Component, OnInit} from '@angular/core';
import {AuctionFilterService} from "../../_services/sidebar-filter.service";
import {GlobalState} from "../../_shared/_global";
import {AuctionFilterPipe} from "../../_pipes/auction-filter.pipe";
import {FilterViewModel} from "../../viewmodels/FilterViewModel";
import {OrderByPipe} from "../../_pipes/orderby.pipe";


@Component({
  moduleId: module.id.toString(),
  selector: "sidebar-filter",
  templateUrl: 'auction-filter.component.html',
  styleUrls: ["auction-filter.component.css"],
  providers: [OrderByPipe]
})

export class AuctionFilterComponent implements OnInit {
  public makers: any;
  public categories: any;
  public colors: any;
  minPrice: number = 0;
  maxPrice: number = 0;
  minYear: number = 0;
  maxYear: number = 0;
  minMiles: number = 0;
  maxMiles: number = 0;

  constructor(private filterService: AuctionFilterService, private _state: GlobalState) {
    this.setJqueryEvents();
    this.subscribeToFilterEvents();
    if (AuctionFilterPipe.filterViewModel.brands.length <= 0) {
      $("#any_0").prop("checked", true)
    }
  }

  ngOnInit() {
    this.initializeData();
  }

  private initializeData() {
    this.loadMakers();
    this.loadCategories();
    this.loadColors();
  }

  private subscribeToFilterEvents() {
    this._state.subscribe('rangeFilterChanged', (x: any) => this.setRanges(x));
  }

  private _currentFilter: FilterViewModel = this.currentFilter;

  get currentFilter(): FilterViewModel {
    return this._currentFilter = AuctionFilterPipe.filterViewModel;
  }

  set currentFilter(value: FilterViewModel) {
    this._currentFilter = value;
    AuctionFilterPipe.filterViewModel = this._currentFilter;
  }

  private loadMakers() {
    this.makers = this.filterService.getMakers();
  }

  private loadCategories() {
    this.categories = this.filterService.getCategories();
  }

  private loadColors() {
    this.colors = this.filterService.getColors();
  }

  setModels(elementId: string, model: string) {
    let isBtnClicked = $(`#${elementId}`)
      .toggleClass("w3-btn-selected")
      .hasClass("w3-btn-selected");

    if (!isBtnClicked) this._currentFilter.models = this._currentFilter.models.filter(e => e !== model);
    else this._currentFilter.models.push(model);

    this._state.notifyDataChanged('filter', this._currentFilter);
  }

  setColors(elementId: string, color: string) {
    if (!$(`#${elementId}`).is(':checked'))
      this._currentFilter.colors = this._currentFilter.colors.filter(e => e !== color);
    else this._currentFilter.colors.push(color);
    this._state.notifyDataChanged('filter', this._currentFilter);
  }

  setBrand(elementId: string, brand: string) {
    if (!$(`#${elementId}`).is(':checked')) {
      this._currentFilter.brands = this._currentFilter.brands.filter(e => e.toLowerCase() !== brand.toLowerCase());
      if (this._currentFilter.brands.length <= 0) {
        $("#any_0").prop('checked', true);
      }
    } else {
      if (brand !== "any") {
        $("#any_0").prop('checked', false);
        this._currentFilter.brands.push(brand.toLowerCase());
      } else {
        this._currentFilter.brands = [];
      }
    }
    this._state.notifyDataChanged('filter', this._currentFilter);
  }

  setPriceRange() {
    this._currentFilter.price.min = this.minPrice;
    this._currentFilter.price.max = this.maxPrice;
    this._state.notifyDataChanged('filter', this._currentFilter);
  }

  setMileRange() {
    this._currentFilter.miles.min = this.minMiles;
    this._currentFilter.miles.max = this.maxMiles;

    this._state.notifyDataChanged('filter', this._currentFilter);
  }

  setYearRange() {
    this._currentFilter.year.min = this.minYear;
    this._currentFilter.year.max = this.maxYear;
    this._state.notifyDataChanged('filter', this._currentFilter);
  }

  private setRanges(x: any) {
    let ove = x as FilterViewModel;
    this.minPrice = ove.price.min;
    this.maxPrice = ove.price.max;

    this.minYear = ove.year.min;
    this.maxYear = ove.year.max;

    this.minMiles = ove.miles.min;
    this.maxMiles = ove.miles.max;
  }

  setJqueryEvents(): void {
    $(function () {
      onWindowResize();

      $(".filter-sidebar-item-header").click(function () {
        $(this).parent().find(".panel-collapse")
          .fadeToggle("fast")
          .collapse("toggle");
      });

      $(".filter-sidebar-item-collapse-panel").on("hide.bs.collapse", function () {
        let closest = $(this).parent().find(".panel-heading > div > i");
        $(closest).removeClass("glyphicon-menu-down")
          .addClass("glyphicon-menu-right");
      }).on("show.bs.collapse", function () {
        let closest = $(this).parent().find(".panel-heading > div > i");
        $(closest).removeClass("glyphicon-menu-right")
          .addClass("glyphicon-menu-down");
      });

      $(".box").click(function () {
        $(this).toggleClass("box-active");
      });

      $(window).resize(function () {
        onWindowResize();
      });

      $("#btn-close-auction-filter").click(function () {
        $("#mySidebar").css("display", "none");
      });

      $("#btn-open-auction-filter").click(function () {
        $("#mySidebar").css("display", "block");
      });

      $("#auction-filter-toggle-panel-btn").click(function () {
        if ($(window).width() < 750)
          $("#auction-filter-panel-body").collapse("toggle");
      });

      function onWindowResize() {
        const windowWidth = $(window).width();
        if (windowWidth < 973.33) {
          $(".w3-main").css("padding-left", "0px");
          $("#mySidebar").css("z-index", 1)
        }
        else if (windowWidth > 973.33) {
          $(".w3-main").css("padding-left", "300px");
          $("#mySidebar").css("z-index", 0)
        }
      }
    });
  }
}

