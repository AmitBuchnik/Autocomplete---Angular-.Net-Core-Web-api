import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { observable, Observable, of } from 'rxjs';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent implements OnInit, OnDestroy {

  private _options: any[];

  @Input() public get options(): any[] {
    return this._options;
  }

  public set options(value: any[]) {
    this._options = value;
    this.showPanel = true;
  }

  @Input() optionLabel = 'label';
  @Input() loading = false;

  @Output() completeMethod = new EventEmitter<string>();
  @Output() select = new EventEmitter<any>();

  showPanel = false;
  selectedOption: any;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  onInput(text: string) {
    this.completeMethod.emit(text);
  }

  onPaste(text: string) {
    this.completeMethod.emit(text);
  }

  onClick() {
    this.showPanel = !this.showPanel;
  }

  onSelectOption(option: string) {
    this.selectedOption = option;
    this.select.emit(option);
    this.showPanel = false;
  }

  ngOnDestroy(): void {
  }

  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: any): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showPanel = false;
    }
  }
}
