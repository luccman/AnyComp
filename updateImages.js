"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = 'https://gusampbmwrpmgzcgfxmb.supabase.co';
var supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1c2FtcGJtd3JwbWd6Y2dmeG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ5MzU2OTIsImV4cCI6MjA3MDUxMTY5Mn0.Zf_rttbNQQGkpXNYNu4P8LkoqYaTSQhQ8NO4Gw5pmFI';
var supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// Stable, permanent corporate/business service images (Pexels)
var mainImages = [
    "https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg",
    "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
    "https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg",
    "https://images.pexels.com/photos/3184632/pexels-photo-3184632.jpeg",
    "https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg",
    "https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg",
    "https://images.pexels.com/photos/3184463/pexels-photo-3184463.jpeg",
    "https://images.pexels.com/photos/3184302/pexels-photo-3184302.jpeg",
    "https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg",
    "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg",
    "https://images.pexels.com/photos/3184403/pexels-photo-3184403.jpeg",
    "https://images.pexels.com/photos/3184362/pexels-photo-3184362.jpeg",
    "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg",
    "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg",
    "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    "https://images.pexels.com/photos/3184455/pexels-photo-3184455.jpeg",
    "https://images.pexels.com/photos/3184485/pexels-photo-3184485.jpeg",
    "https://images.pexels.com/photos/3184422/pexels-photo-3184422.jpeg",
];
// Clean, modern office/meeting/desk stock photos (Pexels)
var secondaryImages = [
    "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg",
    "https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg",
    "https://images.pexels.com/photos/3184633/pexels-photo-3184633.jpeg",
    "https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg",
    "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg",
    "https://images.pexels.com/photos/3182787/pexels-photo-3182787.jpeg",
    "https://images.pexels.com/photos/3184637/pexels-photo-3184637.jpeg",
    "https://images.pexels.com/photos/3184642/pexels-photo-3184642.jpeg",
    "https://images.pexels.com/photos/3182782/pexels-photo-3182782.jpeg",
    "https://images.pexels.com/photos/3182755/pexels-photo-3182755.jpeg",
    "https://images.pexels.com/photos/3182775/pexels-photo-3182775.jpeg",
    "https://images.pexels.com/photos/3182796/pexels-photo-3182796.jpeg",
    "https://images.pexels.com/photos/3182820/pexels-photo-3182820.jpeg",
    "https://images.pexels.com/photos/3182832/pexels-photo-3182832.jpeg",
    "https://images.pexels.com/photos/3182851/pexels-photo-3182851.jpeg",
    "https://images.pexels.com/photos/3182880/pexels-photo-3182880.jpeg",
    "https://images.pexels.com/photos/3182924/pexels-photo-3182924.jpeg",
    "https://images.pexels.com/photos/3182951/pexels-photo-3182951.jpeg",
    "https://images.pexels.com/photos/3182962/pexels-photo-3182962.jpeg",
    "https://images.pexels.com/photos/3182970/pexels-photo-3182970.jpeg",
];
// Professional-looking secretary avatars (Generated Photos + DiceBear)
var secretaryAvatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=sophia",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=oliver",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=noah",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=ava",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=liam",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=charlotte",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=lucas",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=isabella",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=ethan",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=amelia",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=jackson",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=harper",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=benjamin",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=ella",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=henry",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=scarlett",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=william",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=aria",
];
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function updateImages() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, services, error, _i, services_1, service, updated, updateError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, supabase.from("services").select("id")];
                case 1:
                    _a = _b.sent(), services = _a.data, error = _a.error;
                    if (error) {
                        console.error("Error fetching services:", error);
                        return [2 /*return*/];
                    }
                    _i = 0, services_1 = services;
                    _b.label = 2;
                case 2:
                    if (!(_i < services_1.length)) return [3 /*break*/, 5];
                    service = services_1[_i];
                    updated = {
                        image_main_url: getRandom(mainImages),
                        image_secondary_urls: [getRandom(secondaryImages), getRandom(secondaryImages)],
                        secretary_avatar_url: getRandom(secretaryAvatars),
                    };
                    return [4 /*yield*/, supabase
                            .from("services")
                            .update(updated)
                            .eq("id", service.id)];
                case 3:
                    updateError = (_b.sent()).error;
                    if (updateError) {
                        console.error("Failed to update ".concat(service.id), updateError);
                    }
                    else {
                        console.log("Updated service ".concat(service.id));
                    }
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
updateImages();
