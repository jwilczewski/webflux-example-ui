import {Component, OnInit} from '@angular/core';
import {User} from './user';

@Component({
    selector: 'app-root',
    template: `
        <div>
            <div *ngFor="let user of users">{{user.name}} {{user.familyname}}</div>
        </div>
    `,
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    users: User[] = [];

    ngOnInit() {
        const eventSource = new EventSource('http://localhost:8080/findAll');
        eventSource.addEventListener('message', (msg: MessageEvent) => {
            const user: User = JSON.parse(msg.data);
            this.users.push(user);
        });
        eventSource.onerror = () => {
            eventSource.close();
        };
    }
}
