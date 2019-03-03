function main(input) {
    let realHP1 = 0;
    let realHP2 = 0;
    let p = 0;
    
    const obj = {};
    obj.baseHP1 = Number(prompt("Nhập baseHP1: "));
    obj.wp1 = Number(prompt("Nhập wp1: "));
    obj.baseHP2 = Number(prompt("Nhập baseHP2: "));
    obj.wp2 = Number(prompt("Nhập wp2: "));
    obj.ground = Number(prompt("Nhập ground: "));

    // const baseHP1 = 612;
    // const wp1 = 3;
    // const baseHP2 = 800;
    // const wp2 = 1;
    // const ground = 800;

    if (obj.baseHP1 < 99 || obj.baseHP1 > 999) {
        alert("baseHP1 phải từ 99 đến 999");
        return;
    }
    if (obj.baseHP2 < 1 || obj.baseHP2 > 888) {
        alert("baseHP1 phải từ 1 đến 888");
        return;
    }
    /* Debug Error
        console.log(wp1,wp2)
        console.log([0,1,2,3].indexOf(Number(wp1)))
        console.log([0,1,2,3].indexOf(Number(wp2)))
    */
    if ([0, 1, 2, 3].indexOf(Number(obj.wp1)) === -1 || [0, 1, 2, 3].indexOf(Number(obj.wp2)) === -1) {
        alert("wp1 va wp2 là 1 trong các số 1,2,3,4");
        return;
    }
    if (obj.ground < 1 || obj.ground > 999) {
        alert("ground phải từ 99 đến 999");
        return;
    }

    if (obj.wp1 === 1) {
        realHP1 = obj.baseHP1;
    } else if (obj.wp1 === 0) {
        realHP1 = Math.trunc(obj.baseHP1 / 10);
    } else if (obj.wp1 === 2) {
        realHP1 = obj.baseHP1;
    }

    if (obj.wp2 === 1) {
        realHP2 = obj.baseHP2;
    } else if (obj.wp2 === 0) {
        realHP2 = Math.trunc(obj.baseHP2 / 10);
    } else if (obj.wp2 === 2) {
        realHP2 = obj.baseHP2;
    }

    //--------------- III: Đặc biệt, chiến đấu trên địa hình quen thuộc
    if (obj.ground === obj.baseHP1) {
        realHP1 *= 1.1;
        if (realHP1 > 999) {
            realHP1 = 999;
        }
    }
    if (obj.ground === obj.baseHP2) {
        realHP2 *= 1.1;
        if (realHP2 > 999) {
            realHP2 = 999;
        }
    }

    //--------------- IV: wpi = 2, trang bị được sử dụng là một áo giáp đặc biệt được làm từ Mithril
    if (obj.wp1 === 2) {
        if (obj.ground === obj.baseHP1) {
            realHP1 *= 1.1
            if (realHP1 > 999) {
                realHP1 = 999;
            }
        }
    }
    if (obj.wp2 === 2) {
        if (obj.ground === obj.baseHP2) {
            realHP2 *= 1.1
            if (realHP2 > 999) {
                realHP2 = 999;
            }
        }
    }
    if (obj.wp1 === 2 && realHP1 < realHP2) {
        p = 0.50;
        console.log("Trận đấu hòa: " + p.toFixed(2))
        return p;
    }

    if (obj.wp2 === 2 && realHP2 < realHP1) {
        p = 0.50;
        console.log("Trận đấu hòa: " + p.toFixed(2));
        return p
    }

    //--------------- V: wpi = 3, vũ khí sử dụng là gươm Excalibur
    if (obj.wp1 === 3) {
        realHP1 = obj.baseHP1;
        realHP1 *= 2;
        if (obj.ground == obj.baseHP1) {
            realHP1 *= 1.1;
        }
        if (realHP1 > 999) {
            realHP1 = 999;
        }
    }

    if (obj.wp2 === 3) {
        realHP2 = obj.baseHP2
        if (obj.ground === obj.baseHP2) {
            realHP2 *= 1.1
        }
        if (realHP2 > 999) {
            realHP2 = 999
        }
    }

    if (obj.wp1 === 3 && obj.wp2 === 2) {
        {
            if (obj.ground === obj.baseHP2 && realHP2 < realHP1) {
                realHP2 *= 1.1;
            } else if (realHP2 < realHP1) {
                realHP2 = obj.baseHP2;
            }
        }
    }

    //-------------------- VI: Arthur ra trận, luôn luôn thắng bất chấp đối thủ
    if (obj.baseHP1 === 999) {
        p = 1;
        console.log("Vua Arthur luôn luôn thắng. Output: " + p.toFixed(2))
        return p
    }

    //-------------------- VII: Cerdic ra trận
    if (obj.baseHP2 === 888) {
        p = 0
        console.log("Vua Cerdic thắng trận: " + p.toFixed(2));
        return p
    }

    //-------------------- VIII: baseHPi là một số nguyên tố
    const so_nguyen_to = n => {
        let result = true
        for (let i = 2; i < n; i++) {
            if (n % i === 0) {
                result = false;
            }
        }
        return result
    }

    // Truong hop 1: baseHP2 khong phai la Paladin
    if (so_nguyen_to(obj.baseHP1)) {
        if (so_nguyen_to(obj.baseHP2)) {
            if (obj.baseHP2 > obj.baseHP1) {
                p = 0.01;
                console.log("Paladin chiến thắng là một chiến binh Saxon. Kết quả: " + Number(p.toFixed(2)));
                //return p;
            } else if (obj.baseHP1 > obj.baseHP2) {
                p = 0.99;
                console.log("Paladin chiến thắng là một hiệp sĩ Bàn Tròn. Kết quả: " + Number(p.toFixed(2)));
                //return p;
            } else {
                p = 0.5;
                console.log("Hai Paladin có chỉ số baseHP bằng nhau. Kết quả: " + Number(p.toFixed(2)));
                //return p
            }
        }
        else {
            p = 0.99;
            console.log("Paladin (hiệp sĩ Bàn Tròn) chiến thắng. Kết quả: " + Number(p.toFixed(2)));
            //return p
        }
    }
    // Truong hop 2: baseHP1 khong phai la Paladin
    else if (so_nguyen_to(obj.baseHP1) == false) {
        if (so_nguyen_to(obj.baseHP2)) {
            p = 0.01;
            console.log("Paladin (chiến binh Saxon) chiến thắng. Kết quả: " + Number(p.toFixed(2)));
            return p
        }
        else {
            p = (realHP1 - realHP2 + 999) / 2000;
            console.log("Khả năng chiến thắng của hiệp sĩ Bàn Tròn: " + Number(p.toFixed(2)));
            return p;
        }
    }
}
main();
