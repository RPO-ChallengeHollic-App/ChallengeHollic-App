import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GetGroupIdDecorator } from './decorator/get-group-id.decorator';

@Controller('api/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Post('create')
  async create(@Body() createGroupDto: CreateGroupDto) {
    const newGroup = await this.groupService.create(createGroupDto);
    return {
      group: newGroup,
    };
  }

  @Get('get/all')
  async findAll() {
    const groups = await this.groupService.findAll();
    return {
      groups: groups,
    };
  }

  @Get('get/:id')
  async findOne(@GetGroupIdDecorator() id: number) {
    const group = await this.groupService.findOne(id);
    return {
      group: group,
    };
  }

  @Patch('update/:id')
  async update(
    @GetGroupIdDecorator() id: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const updatedUser = await this.groupService.update(id, updateGroupDto);
    return {
      group: updateGroupDto,
    };
  }

  @Delete('delete/:id')
  async remove(@GetGroupIdDecorator() id: number) {
    const removedGroup = this.groupService.remove(id);
    return {
      group: removedGroup,
    };
  }
}
