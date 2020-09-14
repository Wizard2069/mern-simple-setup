import {CacheModule, Module} from '@nestjs/common';
import {TasksService} from './tasks.service';
import {FetchApiModule} from "../fetch-api/fetch-api.module";

@Module({
    imports: [
        FetchApiModule,
        CacheModule.register()
    ],
    providers: [TasksService],
    exports: [TasksService]
})
export class TasksModule {
}
