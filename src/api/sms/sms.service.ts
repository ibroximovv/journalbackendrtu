import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class SmsService {
    private readonly baseUrl = 'https://notify.eskiz.uz/api';
    private readonly email = 'ilyosbekibrohimov22@gmail.com';
    private readonly password = 'Qn1RQYVUbG5NhJKS1d8aVWsWnZeu7pI5gpd7uyPn';
    private token: string | null = null;

    constructor(){}

    async authenticate() {
        try {
            const result = await axios.post(`${this.baseUrl}/auth/login`, {
                email: this.email,
                password: this.password
            });
            this.token = result?.data?.data?.token;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException('Eskiz login failed');
        }
    }

    async ensureAuthenticate() {
        if (!this.token) {
            await this.authenticate();
        }
    }

    async sendSmsToPhone(phone: string, message: string, retry = 1) {
        await this.ensureAuthenticate();
        try {
            const res = await axios.post(`${this.baseUrl}/message/sms/send`, {
                mobile_phone: phone,
                message: 'Bu Eskiz dan test',
                from: '4546'
            }, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            });
            console.log('SMS OTP sent to', phone);
            return res;
        } catch (error) {
            console.log('SMS Error:', error.response?.data || error.message);
            this.token = null;
            if (retry <= 0) throw new InternalServerErrorException('SMS sending failed after retry');
            return this.sendSmsToPhone(phone, message, retry - 1);
        }
    }
}
