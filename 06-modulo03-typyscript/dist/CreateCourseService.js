"use strict";
/**
 * name: string,
 * duration: number
 * educator: string
 */
Object.defineProperty(exports, "__esModule", { value: true });
class CreateCourseService {
    execute({ name, educator, duration }) {
        console.log(name, educator, duration);
    }
}
exports.default = new CreateCourseService(); //assim nao preciso instanciar
