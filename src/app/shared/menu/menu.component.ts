import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})
export class MenuComponent {
    @Output() selectedPage: EventEmitter<string> = new EventEmitter();
    @Input() currentPage!: string;

    menuSwitch() {
        this.selectedPage.emit(this.currentPage);
    }
}
