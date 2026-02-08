package com.java.agendador_horarios.service;

import com.java.agendador_horarios.infrastructure.entity.Agendamento;
import com.java.agendador_horarios.infrastructure.repository.AgendamentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    public Agendamento salvarAgendamento(Agendamento agendamento) {

        LocalDateTime horaAgendamento = agendamento.getDataHoraAgendamento();
        LocalDateTime horaFim = agendamento.getDataHoraAgendamento().plusMinutes(1);

        Agendamento agendados = agendamentoRepository.findByServicoAndDataHoraAgendamentoBetween(agendamento.getServico(),
                horaAgendamento, horaFim);

        if (Objects.nonNull(agendados)) {
            throw new RuntimeException("O horário já está preenchido. Por favor, selecione outro.");
        }
        return agendamentoRepository.save(agendamento);
    }

    public void deletarAgendamento(LocalDateTime dataHoraAgendamento, String cliente) {
        agendamentoRepository.deleteByDataHoraAgendamentoAndCliente(dataHoraAgendamento, cliente);

    }

    public List<Agendamento> buscarAgendamentosDia(LocalDate data) {
        LocalDateTime primeiroHorario = data.atStartOfDay();
        LocalDateTime horarioFinal = data.atTime(23, 59, 59);

        return agendamentoRepository.findByDataHoraAgendamentoBetween(primeiroHorario, horarioFinal);
    }

    public Agendamento alterarAgendamento(Agendamento agendamento, String cliente, LocalDateTime dataHoraAgendamento) {

        Agendamento agenda = agendamentoRepository.findByDataHoraAgendamentoAndCliente(dataHoraAgendamento, cliente);

        if (Objects.isNull(agenda)) {
            throw new RuntimeException("O horário não está preenchido.");
        }
            agendamento.setId(agenda.getId());
            return agendamentoRepository.save(agendamento);
        }
    }

