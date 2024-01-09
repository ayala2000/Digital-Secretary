import { Body, Controller,Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.inteface';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }
    @Post()
    async creatMessage(@Body() req): Promise<Message> {
        console.log(req, "body🏚️", "header🐾");

        return this.messageService.CreateMessage(req.body);
    }

}

