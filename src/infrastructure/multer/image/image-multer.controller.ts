import {
    BadRequestException,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Req,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

@ApiTags('Image File Upload')
@Controller('file')
export class ImageMulterController {
    @Post('upload-image')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: { type: 'string', format: 'binary' },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const uploadPath = join(process.cwd(), 'uploads', 'image');

                    if (!fs.existsSync(uploadPath)) {
                        fs.mkdirSync(uploadPath, { recursive: true });
                    }

                    cb(null, uploadPath);
                },
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname).toLowerCase();
                    cb(null, `image-${uniqueSuffix}${ext}`);
                },
            }),
            limits: {
                fileSize: 20 * 1024 * 1024,
            },
            fileFilter: (req, file, cb) => {
                const allowedTypes = [
                    'image/jpeg',
                    'image/png',
                    'image/jpg',
                    'image/webp',
                    'image/gif',
                ];

                if (!allowedTypes.includes(file.mimetype)) {
                    return cb(
                        new BadRequestException('❌ Faqat JPEG, PNG, WEBP yoki GIF rasm fayllarini yuklash mumkin!'),
                        false,
                    );
                }

                cb(null, true);
            },
        }),
    )
    uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
        if (!file) {
            throw new BadRequestException('File is required or not valid!');
        }

        const protocol = req.protocol;
        const host = req.get('host');
        const fileUrl = `${protocol}://${host}/uploads/image/${file.filename}`;

        return {
            success: true,
            message: '✅ Rasm muvaffaqiyatli yuklandi',
            link: fileUrl,
            originalName: file.originalname,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            mimetype: file.mimetype,
        };
    }
}